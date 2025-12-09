
for file in ./content/blog/*.md
do
    NAME=`echo "$file" | cut -d'.' -f2 | cut -d'/' -f4`
    
    # echo "Processing $file"
    result=$(cat  $file | grep $NAME)
    if [ -z "$result" ]
    then
        echo "code $file"
    fi

 
  # cat $file | grep 
done