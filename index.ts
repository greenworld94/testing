import tl = require('azure-pipelines-task-lib/task');
declare var require:any
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function publicimage() {
    try {
        var imagename: string | undefined = tl.getInput('Docker image Name', true);
        var imageversion: string | undefined = tl.getInput('Docker image Version', true);
        var imagetype: string | undefined = tl.getInput('ImageType', true);     
        var command = 'CLAIR_ADDR=http://localhost CLAIR_OUTPUT=Medium CLAIR_THRESHOLD=10 klar'  + " " +imagename+':'+imageversion
        const { stdout, stderr } = await exec(command);
        console.log(command);
       console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
        console.error(err);
    }
}
async function privateimage() {
    try {
        var imagename: string | undefined = tl.getInput('Docker image Name', true);
        var imageversion: string | undefined = tl.getInput('Docker image Version', true);
        var dockerusername: string | undefined = tl.getInput('DockerHub Username', true); 
        var dockerpassword: string | undefined = tl.getInput('DockerHub Password', true); 
        var registryname: string | undefined = tl.getInput('Private Registry Name', true);  
        console.log(registryname);  
        var command = 'CLAIR_ADDR=http://localhost CLAIR_OUTPUT=Medium CLAIR_THRESHOLD=10'+ " " + 'DOCKER_USER=' + dockerusername + " " + 'DOCKER_PASSWORD='+ dockerpassword + " " + 'klar' + " " + registryname +'/'+ imagename+':'+imageversion
        const { stdout, stderr } = await exec(command);
        console.log(command);
       console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
        console.error(err);
    }
}
var stdout: string
var stderr: string
var imagetype: string | undefined = tl.getInput('ImageType', true);     
if (imagetype === "option2") 
{
privateimage();
} else {
publicimage();
}

     