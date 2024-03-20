#!/bin/bash

set -e

if [ "$1" != "gunicorn" ]; then
	exec "$@"
fi

base64 -d <<< "CiBfXyAgICAgICAgICBfXyAgICAgICAgXyBfICAgXyBfXyAgICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgICBfX19fX18gXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX19fXyAgICAgICAgICAgIF8gICAgICAgICAgICAgXyBfICAgICAgICAgICAKIFwgXCAgICAgICAgLyAvICAgICAgIHwgfCB8IHwgfFwgXCAgICAgICAgLyAoXykgICAgICAgICAgICAgICAgICAgfCAgX19fXyhfKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyBfX19ffCAgICAgICAgICB8IHwgICAgICAgICAgIHwgfCB8ICAgICAgICAgIAogIFwgXCAgL1wgIC8gL19fICBfXyBffCB8IHxffCB8X1wgXCAgL1wgIC8gLyBfIF9fXyAgX19fICAgX19fX19fICB8IHxfXyAgIF8gXyBfXyAgIF9fIF8gXyBfXyAgIF9fXyBfX18gIHwgfCAgICAgX19fICBfIF9fIHwgfF8gXyBfXyBfX18gfCB8IHwgX19fIF8gX18gCiAgIFwgXC8gIFwvIC8gXyBcLyBfYCB8IHwgX198ICdfIFwgXC8gIFwvIC8gfCAvIF9ffC8gXyBcIHxfX19fX198IHwgIF9ffCB8IHwgJ18gXCAvIF9gIHwgJ18gXCAvIF9fLyBfIFwgfCB8ICAgIC8gXyBcfCAnXyBcfCBfX3wgJ19fLyBfIFx8IHwgfC8gXyBcICdfX3wKICAgIFwgIC9cICAvICBfXy8gKF98IHwgfCB8X3wgfCB8IFwgIC9cICAvICB8IFxfXyBcICBfXy8gICAgICAgICAgfCB8ICAgIHwgfCB8IHwgfCAoX3wgfCB8IHwgfCAoX3wgIF9fLyB8IHxfX198IChfKSB8IHwgfCB8IHxffCB8IHwgKF8pIHwgfCB8ICBfXy8gfCAgIAogICAgIFwvICBcLyBcX19ffFxfXyxffF98XF9ffF98IHxffFwvICBcLyAgIHxffF9fXy9cX19ffCAgICAgICAgICB8X3wgICAgfF98X3wgfF98XF9fLF98X3wgfF98XF9fX1xfX198ICBcX19fX19cX19fL3xffCB8X3xcX198X3wgIFxfX18vfF98X3xcX19ffF98ICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo="

if [ $AMBIENTE == "desenvolvimento" ]; then

	# migrações devem ser commitadas pelos desenvolvedores,
	# jamais geradas dinâmicamente numa pipeline CI
	echo "========================="
	echo "=== Criando migrações ==="
	echo "========================="
	python3 manage.py makemigrations

	echo "==========================="
	echo "=== Aplicando migrações ==="
	echo "==========================="
	python3 manage.py migrate

	echo "===================================="
	echo "=== Coletando arquivos estáticos ==="
	echo "===================================="
	python3 manage.py collectstatic --no-input
fi

# executa gunicorn com argumentos após inicialização
if [ "$1" == "gunicorn" ]; then
	exec "$@"
else
	gunicorn --config './gunicorn.conf.py'
fi