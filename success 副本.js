const http=require('http')
const port=3000

const server= http.createServer(function(req,res)
{
	res.write('hello')
	res.end()
})

server.listen(port,function(error)
{
	if(error)
	{
		console.log('error: '+error)
	}
	else
	{
		console.log('listen: '+port)
	}
})