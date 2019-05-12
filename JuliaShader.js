
THREE.JuliaShader = {

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
		}
	},

	vertexShader: [

		"#ifdef GL_ES",
		"precision highp float;",
		"#endif",

		"varying vec2 pos;",
		"uniform vec2 center;",
		"uniform vec2 scale;",
		"uniform vec3 colour;",

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

		"void main() {",
			"const int maxIterations = 250;",
			"const int threshhold = 200;",
			"vec2 c = vec2(0.285, 0.01);",
			
			"int iter = 0;",
			"vec2 z = vec2(pos.x, pos.y);",
			"for (int i = 0; i < maxIterations; i++) {",
				"float xtmp = (z.x*z.x - z.y*z.y) + c.x;",
				"z.y = 2.0*z.x*z.y + c.y;",
				"z.x = xtmp;",

				"if (z.x*z.x + z.y*z.y >= 4.0) break;",
				"iter = i;",
			"}",

			"float r = (iter >= threshhold) ? 0.0 : float(iter)/float(maxIterations) * colour.x;",
			"float g = (iter >= threshhold) ? 0.0 : float(iter)/float(maxIterations) * colour.y;",
			"float b = (iter >= threshhold) ? 0.0 : float(iter)/float(maxIterations) * colour.z;",

			"gl_FragColor = vec4(r,  // R",
			                "g,  // G",
			                "b,  // B",
			                "1.0); // A",
		"}",

	].join("\n")

};
