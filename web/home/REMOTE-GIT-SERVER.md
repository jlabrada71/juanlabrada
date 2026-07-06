
--- in the local ---
git config core.sshCommand 'ssh -i ~/.ssh/aws-juanlabrada.com.pem'
git remote add production ubuntu@ec2-3-135-51-234.us-east-2.compute.amazonaws.com:/home/ubuntu/sources/juanlabrada.com.git
git push production main
git pull production main

--- in the server create the project ---
(the version in the server is updated, read that)


mkdir <repositoryname>.git
cd <repositoryname>.git
git init --bare
cd ..
cp post-receive new-repository.git/hooks
chmod +x new-repository.git/hooks/post-receive


--- sample post-receive

#!/bin/bash

# Read the stdin line by line
while read oldrev newrev refname
do
    # Get the branch name from the full ref
    branch=$(git rev-parse --short "$refname")
    
    echo "Push detected on branch: $branch"
    
    # Example: Trigger action if the main branch changes
    if [ "$refname" = "refs/heads/main" ]; then
        echo "Deploying to production..."
        # Add your deployment commands here
    fi
done

--- there is a new sample in the server in javascript