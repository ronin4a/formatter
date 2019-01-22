#!/usr/bin/bash

python3 formatter.py test2.txt
echo "********* ORIGINAL *********"
cat test2.txt
echo "********* UPDATED *********"
cat edited_test2.txt
