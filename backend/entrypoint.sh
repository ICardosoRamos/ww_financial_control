#!/bin/bash

set -e

if [ "$1" != "gunicorn" ]; then
	exec "$@"
fi

base64 -d <<< "CiBfXyAgICAgICAgICBfX19fICAgICAgICAgIF9fICAgICAgICAgICBfX19fX18gXyAgICAgICAgICAgICAgICAgICAgICAgIF8gICAgICAgXyAgICBfX19fXyAgICAgICAgICAgIF8gICAgICAgICAgICAgXyAKIFwgXCAgICAgICAgLyAvXCBcICAgICAgICAvIC8gICAgICAgICAgfCAgX19fXyhfKSAgICAgICAgICAgICAgICAgICAgICAoXykgICAgIHwgfCAgLyBfX19ffCAgICAgICAgICB8IHwgICAgICAgICAgIHwgfAogIFwgXCAgL1wgIC8gLyAgXCBcICAvXCAgLyAvICAgX19fX19fICB8IHxfXyAgIF8gXyBfXyAgIF9fIF8gXyBfXyAgIF9fXyBfICBfXyBffCB8IHwgfCAgICAgX19fICBfIF9fIHwgfF8gXyBfXyBfX18gfCB8CiAgIFwgXC8gIFwvIC8gICAgXCBcLyAgXC8gLyAgIHxfX19fX198IHwgIF9ffCB8IHwgJ18gXCAvIF9gIHwgJ18gXCAvIF9ffCB8LyBfYCB8IHwgfCB8ICAgIC8gXyBcfCAnXyBcfCBfX3wgJ19fLyBfIFx8IHwKICAgIFwgIC9cICAvICAgICAgXCAgL1wgIC8gICAgICAgICAgICAgfCB8ICAgIHwgfCB8IHwgfCAoX3wgfCB8IHwgfCAoX198IHwgKF98IHwgfCB8IHxfX198IChfKSB8IHwgfCB8IHxffCB8IHwgKF8pIHwgfAogICAgIFwvICBcLyAgICAgICAgXC8gIFwvICAgICAgICAgICAgICB8X3wgICAgfF98X3wgfF98XF9fLF98X3wgfF98XF9fX3xffFxfXyxffF98ICBcX19fX19cX19fL3xffCB8X3xcX198X3wgIFxfX18vfF98CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo="


if [ $AMBIENTE == "development" ]; then

	# Migrations must be commited by devs only. Never dinamicaly in a CI Pipeline.
	
	echo "========================="
	echo "=== Creating Migrations ==="
	echo "========================="
	python3 manage.py makemigrations

	echo "==========================="
	echo "=== Applying Migrations ==="
	echo "==========================="
	python3 manage.py migrate

	echo "===================================="
	echo "=== Collecting Static Files ==="
	echo "===================================="
	python3 manage.py collectstatic --no-input
fi

# Gunicorn for production
if [ "$1" == "gunicorn" ]; then
	exec "$@"
else
	gunicorn --config './gunicorn.conf.py'
fi