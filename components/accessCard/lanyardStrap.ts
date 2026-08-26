import * as THREE from "three";

/**
 * A flat ribbon that follows the lanyard curve.
 *
 * This replaces the `meshline` dependency the original PR used. MeshLine
 * extrudes its ribbon in *screen* space and corrects for the canvas aspect
 * ratio inside its vertex shader; in this card's narrow canvas
 * (320 x 684, aspect 0.47) that correction skewed the strap into a diagonal
 * slab that pointed nowhere near the card, even though the curve feeding it
 * was a clean vertical line.
 *
 * The card is viewed essentially head-on, so the strap can simply be built in
 * the XY plane: offset each point along the normal of its own tangent. No
 * shader maths, no aspect ratio, and one geometry allocated for the lifetime
 * of the component rather than one per frame.
 */
export class LanyardStrap {
  readonly geometry: THREE.BufferGeometry;

  private readonly segments: number;
  private readonly halfWidth: number;
  private readonly positions: Float32Array;
  private readonly tangent = new THREE.Vector3();
  /** Curve samples, reused every frame instead of reallocated by getPoints(). */
  private readonly samples: THREE.Vector3[];

  constructor(segments = 32, width = 0.16) {
    this.segments = segments;
    this.halfWidth = width / 2;

    const vertexCount = (segments + 1) * 2;
    this.positions = new Float32Array(vertexCount * 3);
    this.samples = Array.from(
      { length: segments + 1 },
      () => new THREE.Vector3()
    );

    // Two vertices per sample, stitched into a strip. The winding never
    // changes, so the index buffer is built once here.
    const indices: number[] = [];
    for (let i = 0; i < segments; i += 1) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 2, a + 1, a + 3);
    }

    const uvs = new Float32Array(vertexCount * 2);
    for (let i = 0; i <= segments; i += 1) {
      const v = i / segments;
      uvs[i * 4] = 0;
      uvs[i * 4 + 1] = v;
      uvs[i * 4 + 2] = 1;
      uvs[i * 4 + 3] = v;
    }

    // The ribbon is built in the XY plane and viewed head-on, so every vertex
    // normal is +Z. Writing them once here means `update` does not have to call
    // `computeVertexNormals()` — which walked all 66 vertices and every face,
    // sixty times a second, to arrive at this same answer.
    const normals = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i += 1) {
      normals[i * 3 + 2] = 1;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    this.geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    this.geometry.setIndex(indices);

    // Fixed and deliberately generous, covering anywhere the strap can swing.
    // Recomputing it per frame only ever fed frustum culling for an object that
    // is on screen whenever the card is.
    this.geometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(0, 0, 0),
      12
    );
  }

  /** Rewrites the ribbon in place from the current curve. */
  update(curve: THREE.CatmullRomCurve3): void {
    // getPoint(t, target) writes into our own vectors; getPoints() would
    // allocate a fresh array of 33 Vector3s on every single frame.
    const points = this.samples;
    for (let i = 0; i <= this.segments; i += 1) {
      const target = points[i];
      if (target) curve.getPoint(i / this.segments, target);
    }

    for (let i = 0; i <= this.segments; i += 1) {
      const point = points[i];
      const previous = points[Math.max(i - 1, 0)];
      const next = points[Math.min(i + 1, this.segments)];

      // `samples` is allocated once with exactly segments + 1 entries and every
      // index above is clamped into range, so these are always present. The
      // check satisfies the type system; the branch is never taken.
      if (!point || !previous || !next) continue;

      this.tangent.subVectors(next, previous);
      // A degenerate segment (two coincident samples) would normalise to NaN
      // and blank the whole strip, so fall back to straight up.
      if (this.tangent.lengthSq() < 1e-10) {
        this.tangent.set(0, 1, 0);
      }
      this.tangent.normalize();

      // Perpendicular within the XY plane.
      const nx = -this.tangent.y * this.halfWidth;
      const ny = this.tangent.x * this.halfWidth;

      const offset = i * 6;
      this.positions[offset] = point.x + nx;
      this.positions[offset + 1] = point.y + ny;
      this.positions[offset + 2] = point.z;
      this.positions[offset + 3] = point.x - nx;
      this.positions[offset + 4] = point.y - ny;
      this.positions[offset + 5] = point.z;
    }

    // Normals and bounds are fixed (see the constructor), so the only thing
    // that changes per frame is the position buffer.
    const position = this.geometry.attributes.position;
    if (position) position.needsUpdate = true;
  }

  dispose(): void {
    this.geometry.dispose();
  }
}
