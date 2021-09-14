function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //definisikan vertex-vertex
    /**
     * A (0.0, 0.5), B (0.5, -0.5), C (-0.5, -0.5)
     */

     var vertices = [
        0.0, 0.5,    //titik A
        0.5, -0.5,   //titik B
        -0.5, -0.5   //titik C
    ];

    // // untuk lines
    // var vertices = [
    //     0.0, 0.5,    //titik A
    //     0.5, -0.5,   //titik B
    //     0.5, -0.5,   //titik B
    //     -0.5, -0.5,   //titik C
    //     -0.5, -0.5,  //titik C
    //      0.0, 0.5,    //titik A
    // ];

    // //untuk line_strip
    // var vertices = [
    //     0.0, 0.5,    //titik A
    //     0.5, -0.5,   //titik B
    //     -0.5, -0.5,  //titik C
    //     0.0, 0.5,    //titik A
    // ];

    // //untuk triangle_strip, fan
    // var vertices = [
    //     0.5, 0.5,    //titik A
    //     0.5, -0.5,   //titik B
    //     -0.5, -0.5,  //titik C
    //     -0.5, 0.5    //titik D
    // ];

    // //triangles jadi persegi
    // var vertices = [
    //     0.5, 0.5,    //titik A
    //     0.5, -0.5,   //titik B
    //     -0.5, -0.5,  //titik C
    //     -0.5, -0.5,  //titik C
    //     -0.5, 0.5,   //titik D
    //     0.5, 0.5    //titik A
    // ];


    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertextShaderCode =`
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertextShaderCode);
    gl.compileShader(vertexShader);

    //definisi fragment
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.POINTS, 0, 3); //untuk titik
    // gl.drawArrays(gl.LINES, 0, 6);
    // gl.drawArrays(gl.LINE_LOOP, 0, 3);
    // gl.drawArrays(gl.LINE_STRIP, 0, 4);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); //minimal 3 titik JADI KANAN KIRI
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); // ATAS BAWAH
    gl.drawArrays(gl.TRIANGLES, 0, 3); //3 titik abc aja cukup untuk buat 1 segitiga
    // gl.drawArrays(gl.TRIANGLES, 0, 6); //gambar segi4 dengan gl triangles
}