import React, { useEffect } from 'react';
import 'aframe';
import 'aframe-ar';

const ModelViewer = () => {

  useEffect(() => {
    const requestCameraPermission = () => {
      // For iOS and Safari
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            // Success: camera access granted
            console.log('Camera access granted.');
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
            alert('Please enable camera access in your device settings.');
          });
      } else {
        // For other browsers like Chrome on Android
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'camera' }).then((permission) => {
            if (permission.state === 'granted') {
              console.log('Camera permission already granted.');
            } else if (permission.state === 'prompt') {
              navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                  console.log('Camera access granted.');
                })
                .catch((error) => {
                  console.error('Error accessing camera:', error);
                  alert('Please enable camera access in your device settings.');
                });
            } else {
              alert('Camera access denied. Please allow camera access in your browser settings.');
            }
          });
        } else {
          // Fallback for older browsers
          navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
              console.log('Camera access granted.');
            })
            .catch((error) => {
              console.error('Error accessing camera:', error);
              alert('Please enable camera access in your device settings.');
            });
        }
      }
    };

    const enterFullscreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) { // Safari on iOS
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) { // IE/Edge
        docEl.msRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) { // Firefox on Android/Windows
        docEl.mozRequestFullScreen();
      }
    };

    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        // Request camera permission
        requestCameraPermission();
        // Request fullscreen when the scene is loaded
        if (document.fullscreenEnabled && !document.fullscreenElement) {
          enterFullscreen();
        }
      });

      // Re-request fullscreen on user interaction if it fails initially
      sceneEl.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          enterFullscreen();
        }
      });
    }
  }, []);

  const handleTouch = () => {
    alert('Encontraste 10% de descuento!');
  };

  return (
    <a-scene 
      embedded 
      arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;" 
      vr-mode-ui="enabled: false;" // Disable VR mode UI
      renderer="logarithmicDepthBuffer: true; antialias: true;" // Improve rendering quality
      device-orientation-permission-ui="enabled: true"> // Ensure permissions are asked

      <a-assets>
        <a-asset-item id="model" src="/models/cubo.glb"></a-asset-item>
      </a-assets>

      <a-marker preset="hiro">
        <a-entity
          gltf-model="#model"
          scale="0.5 0.5 0.5"
          onClick={handleTouch}
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
          position="0 0 0">
        </a-entity>
      </a-marker>

      <a-camera-static></a-camera-static>
    </a-scene>
  );
};

export default ModelViewer;
