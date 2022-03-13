
1) Please copy all files in this directory to: "C:\xampp\htdocs\api".

2) Open : "...\CapstoneProject\app\config\ip.js"

3) Change "ip" to your IP address. Change "port" if necessary.

4) When writing URLs into reactnative files:
	4a) Add:
			import ip from "../config/ip";
			
	4b) Write URLs as follows(change filename):
			"http://" + ip.ip + ":" + ip.port + "/api/filename.php"

5) Please copy all new files back into this directory.