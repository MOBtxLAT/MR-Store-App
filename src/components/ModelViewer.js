import React, { useEffect } from 'react';
import 'aframe';

const ModelViewer = () => {

  useEffect(() => {
    const requestCameraPermission = () => {
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            console.log('Camera access granted.');
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
            alert('Please enable camera access in your device settings.');
          });
      } else {
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
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      }
    };

    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        requestCameraPermission();
        if (document.fullscreenEnabled && !document.fullscreenElement) {
          enterFullscreen();
        }
      });

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
      vr-mode-ui="enabled: false;" 
      renderer="logarithmicDepthBuffer: true; antialias: true;" 
      device-orientation-permission-ui="enabled: true">
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
