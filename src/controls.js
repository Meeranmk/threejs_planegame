import { Vector3, Quaternion, Matrix4 } from 'three';

const input = {
    left: false,
    right: false,
    up: false,
    down: false,
    shift: false,
};

window.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') input.left = true;
    if (e.key === 'd' || e.key === 'ArrowRight') input.right = true;
    if (e.key === 'w' || e.key === 'ArrowUp') input.up = true;
    if (e.key === 's' || e.key === 'ArrowDown') input.down = true;
    if (e.key === 'Shift') input.shift = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') input.left = false;
    if (e.key === 'd' || e.key === 'ArrowRight') input.right = false;
    if (e.key === 'w' || e.key === 'ArrowUp') input.up = false;
    if (e.key === 's' || e.key === 'ArrowDown') input.down = false;
    if (e.key === 'Shift') input.shift = false;
});

const rotationSpeed = 0.02;
const speed = 0.05;
const boostSpeed = 0.1;

export function updatePlaneAxis(x, y, z, planePosition, camera) {
    // Speed
    const currentSpeed = input.shift ? boostSpeed : speed;

    // Input handling
    if (input.left) {
        // Yaw left
        const q = new Quaternion().setFromAxisAngle(y, rotationSpeed);
        x.applyQuaternion(q);
        z.applyQuaternion(q);
    }
    if (input.right) {
        // Yaw right
        const q = new Quaternion().setFromAxisAngle(y, -rotationSpeed);
        x.applyQuaternion(q);
        z.applyQuaternion(q);
    }
    if (input.up) {
        // Pitch down
        const q = new Quaternion().setFromAxisAngle(x, rotationSpeed);
        y.applyQuaternion(q);
        z.applyQuaternion(q);
    }
    if (input.down) {
        // Pitch up
        const q = new Quaternion().setFromAxisAngle(x, -rotationSpeed);
        y.applyQuaternion(q);
        z.applyQuaternion(q);
    }

    // Roll (banking) based on yaw
    if (input.left) {
        const q = new Quaternion().setFromAxisAngle(z, rotationSpeed);
        x.applyQuaternion(q);
        y.applyQuaternion(q);
    }
    if (input.right) {
        const q = new Quaternion().setFromAxisAngle(z, -rotationSpeed);
        x.applyQuaternion(q);
        y.applyQuaternion(q);
    }

    // Move forward
    planePosition.add(z.clone().multiplyScalar(-currentSpeed));

    // Normalize vectors to prevent drift
    x.normalize();
    y.normalize();
    z.normalize();
}
