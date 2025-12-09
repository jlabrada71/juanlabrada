name=$1
echo $1
# this is best implemented as javascript 
# copy templates/entity directory as $1
# replace 'File' by $1 in all files
# replace 'file' by $2 in all files
# mv $1 to src
# replace in src/app/router/AggregateRoutes.js   '/* Do not remove: new entity */' by templates/add-AggregateRoutes.template
# replace in src/app/views/Admin.vue             '<!-- Do not remove: new entity -->' by templates/add-Admin.templates
# in both replace File and file by $1 and $2