import React, { useEffect } from 'react';
import 'aframe';
//import 'ar.js';

const ModelViewer = () => {
  useEffect(() => {
    const enterFullscreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) { // Safari on iOS
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) { // IE/Edge
        docEl.msRequestFullscreen();
      }
    };

    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        enterFullscreen(); // Try to enter fullscreen when the scene is loaded
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
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: true;">
      <a-assets>
        <a-asset-item id="model" src="/models/cubo.glb"></a-asset-item>
      </a-assets>

      <a-marker preset="hiro">
        <a-box position="0 0.5 0" material="color: green;" scale="0.5 0.5 0.5"></a-box>
      </a-marker>

      <a-camera-static></a-camera-static>
    </a-scene>
  );
};

export default ModelViewer;
