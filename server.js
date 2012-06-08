var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function(request,response){
	var my_path = url.parse(request.url).pathname;
	var full_path = path.join(process.cwd(),my_path);
	var home_path = path.join(process.cwd(),'/index.html');

	path.exists(full_path,function(exists){
		if(!exists){
			         filesys.readFile(home_path,"binary",function(err,file){
						if(err){
			         		response.writeHeader(500, {"Content-Type": "text/plain"});
			         		response.write(err + "\n");
						}else{
							response.writeHeader(200);
			        		response.write(file, "binary");
			         		response.end();  
						}			         
			         });
		}
		else{
			filesys.readFile(full_path, "binary", function(err, file) {
			     if(err) {
			         filesys.readFile(home_path,"binary",function(err,file){
						if(err){
			         		response.writeHeader(500, {"Content-Type": "text/plain"});
			         		response.write(err + "\n");
						}else{
							response.writeHeader(200);
			        		response.write(file, "binary");
			         		response.end();  
						}			         
			         });
			     }
				 else{
					response.writeHeader(200);
			        response.write(file, "binary");
			        response.end();
				}

			});
		}
	});
}).listen(80);
sys.puts("Server Running on 80");
