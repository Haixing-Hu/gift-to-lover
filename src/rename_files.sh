#!/bin/bash

declare -r USAGE="\
Usage: batchrename.sh EXTENSION

  Renames all files under the current directory sequentially.

  For example,

    ./batchrename.sh

  will renames all files in the current directory to \"1.mp3\", \"2.mp3\",
  ..., \"100.mp3\", ..., etc.
";

if [ "$1" == "--help" -o "$1" == "-h" ]; then
  echo "$USAGE";
  return 1;
fi

declare file, ext, newfile, i=1;
for file in $(ls | sort -n); do
  ext="${file##*.}";
  newfile="${i}.${ext}.tmp";
  echo "rename ${file} to ${newfile}";
  mv "${file}" "${newfile}";
  let i=i+1;
done
for file in *; do
  newfile="${file%.*}";
  echo "rename ${file} to ${newfile}";
  mv "${file}" "${newfile}";
done