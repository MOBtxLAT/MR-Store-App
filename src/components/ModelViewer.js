import React from 'react';
import 'aframe';
//import 'ar.js';

const ModelViewer = () => {
  const handleTouch = () => {
    alert('Encontraste 10% de descuento!');
  };

  return (
    <a-scene embedded arjs>
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