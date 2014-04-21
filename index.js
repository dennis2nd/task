var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.sendfile('./index.html');
});

app.get('/:operation', function (req, res) {

	// 不执行参数检查, 交由客户端浏览器
	var resolve_query = function (op) {
		var actions = {
			'add' : function (args) {
				var result = 0, i;
				for (i = 0; i < args.length; ++i) {
					result = result + args[i];
				}
				return result;
			},
			'multiple' : function (args) {
				var result = 1, i;
				for (i = 0; i < args.length; ++i) {
					result *= args[i];
				}
				return result;
			}
		};

		var i, params = req.query.number, args = [];
		if (typeof params === "string") {
			args[0] = parseFloat(params);
		} else {
			for (i = 0; i < params.length; ++i) {
				args[i] = parseFloat(params[i]);
			}
		}

		/*if (typeof actions[op] !== 'function') {
   			throw new Error('Invalid action.');
  		}*/
  		return actions[op](args);
	};

	var result = resolve_query(req.params.operation);
	res.send(result + "");
});

app.listen(3000);

