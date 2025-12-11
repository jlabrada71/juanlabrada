
--- in the local ---
git config core.sshCommand 'ssh -i ~/.ssh/aws-juanlabrada.com.pem'
git remote add production ubuntu@ec2-3-135-51-234.us-east-2.compute.amazonaws.com:/home/ubuntu/sources/juanlabrada.com.git
git push production main
git pull production main

--- in the server create the project ---
cd /home/ubuntu/sources
mkdir <projectname>.git
cd <projectname>.git
git init --bare

