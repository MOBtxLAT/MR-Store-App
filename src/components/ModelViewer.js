import React, { useEffect } from 'react';
import 'aframe';

const ModelViewer = () => {

  useEffect(() => {
    // Ensure camera permissions are requested
    const requestCameraPermission = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            console.log('Camera access granted.');
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
            alert('Camera access is required to view the AR experience. Please enable it in your browser settings.');
          });
      } else {
        alert('Your device does not support camera access.');
      }
    };

    // Enter fullscreen mode for better AR experience
    const enterFullscreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) { // Safari on iOS
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) { // IE/Edge
        docEl.msRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) { // Firefox on Android
        docEl.mozRequestFullScreen();
      }
    };

    // Trigger camera permission request and fullscreen mode when the scene loads
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        requestCameraPermission(); // Ask for camera access
        enterFullscreen(); // Attempt to enter fullscreen mode
      });

      // Ensure camera access is re-requested on user interaction if needed
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
      arjs="sourceType: webcam; trackingMethod: best; debugUIEnabled: true;" 
      vr-mode-ui="enabled: false;" // Disable VR mode UI
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
