
THREE.MandelbrotShader = {

	uniforms: {
		center: {
			type: 'v2',
			value: new THREE.Vector2(0.5, 0.0)
		},
		scale: {
			type: 'v2',
			value: new THREE.Vector2(1.0, 1.0)
		},
		colour: {
			type: 'v3',
			value: new THREE.Vector3(1.0, 1.0, 1.0)
		},
		iterations: {
			type: 'i',
			value: 300
		},
		threshhold: {
			type: 'i',
			value: 210
		},
		convergence: {
			type: 'f',
			value: 0.0
		}
	},

	vertexShader: [

		"#ifdef GL_ES",
		"precision highp float;",
		"#endif",

		"varying vec2 pos;",
		"uniform vec2 center;",

		"void main() {",
		  "gl_Position = projectionMatrix *",
		                "modelViewMatrix *",
		                "vec4(position,1.0);",
		  "pos.x = gl_Position.x;",
		  "pos.y = gl_Position.y;",
		"}",

	].join("\n"),

	fragmentShader: [

		"#ifdef GL_ES",
		"precision highp float;",
		"#endif",

		"varying vec2 pos;",
		"uniform vec2 center;",
		"uniform vec2 scale;",
		"uniform vec3 colour;",
		"uniform int iterations;",
		"uniform int threshhold;",
		"uniform float convergence;",

		"void main() {",
			"vec2 sc = vec2(scale.x*pos.x - center.x, scale.y*pos.y - center.y);",

			"int iter = 0;",
			"vec2 z = sc;",
			"int counter = iterations;",
			"for (int i = 0; i >= 0; i++) {;",
				"float xtmp = (z.x*z.x - z.y*z.y) + sc.x;",
				"z.y = 2.0*z.x*z.y + sc.y;",
				"z.x = xtmp;",

				"if (z.x*z.x + z.y*z.y >= 4.0) break;",
				"iter += 1;",
				"if (counter < 0) break;",
				"counter--;",
			"}",

			"float r = (iter >= threshhold) ? convergence : float(iter)/float(iterations) * colour.x;",
			"float g = (iter >= threshhold) ? convergence : float(iter)/float(iterations) * colour.y;",
			"float b = (iter >= threshhold) ? convergence : float(iter)/float(iterations) * colour.z;",

			"gl_FragColor = vec4(r,  // R",
			                "g,  // G",
			                "b,  // B",
			                "1.0); // A",
		"}",

	].join("\n")

};
