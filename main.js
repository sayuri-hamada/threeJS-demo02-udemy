import './style.css'
import * as THREE from 'three';


// canvas
const canvas = document.querySelector('#webgl');

// シーン
const scene = new THREE.Scene();

// 背景用のテクスチャ
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('bg/scene-bg.jpg');

scene.background = bgTexture;

// サイズ
const sizes = {
  width: innerWidth,
  height: innerHeight
}

// カメラ
const camera = new THREE.PerspectiveCamera(
  75, //視野角
  sizes.width / sizes.height, //アスペクト比
  0.1, //near
  1000 //far
)

// レンダラー
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio); //荒さを軽減

// アニメーション
const tick = () => {
  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
}

tick();

// ブラウザのリサイズ操作
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})
