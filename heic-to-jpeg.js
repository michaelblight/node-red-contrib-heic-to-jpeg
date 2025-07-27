const fs = require("fs/promises");
const convert = require("heic-convert");

module.exports = function(RED) {
	function HeicToJpegNode(n) {
		RED.nodes.createNode(this,n)

		this.filename = n.filename
		this.sendpane = n.sendpane
		var node = this

		node.on('input', function(msg) {
			filename = node.filename

			try {
				const inputBuffer = fs.readFile(this.filename);
				const outputBuffer = convert({
					buffer: inputBuffer, // the HEIC file buffer
					format: "JPEG", // output format
					quality: 1, // the jpeg compression quality, between 0 and 1
				});

				msg.payload = outputBuffer;
			} catch (error) {
				console.log(error);
			}

			node.send(msg); // pass through original message
		})
	}

	RED.nodes.registerType("heic-to-jpeg", HeicToJpegNode)

}
