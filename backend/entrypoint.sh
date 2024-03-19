#!/bin/bash

set -e

if [ "$1" != "gunicorn" ]; then
	exec "$@"
fi

base64 -d <<< "IF9fX19fX18gIF9fICAgX18gIF9fICAgIF8gIF9fX19fXyAgIF9fXyAgIF9fXyAgIF8gIF9fX19fX18gIF9fX19fX18gCnwgICAgICAgfHwgIHwgfCAgfHwgIHwgIHwgfHwgICAgICB8IHwgICB8IHwgICB8IHwgfHwgICAgICAgfHwgICAgICAgfAp8ICBfX19fX3x8ICB8X3wgIHx8ICAgfF98IHx8ICBfICAgIHx8ICAgfCB8ICAgfF98IHx8ICAgXyAgIHx8ICBfX19fX3wKfCB8X19fX18gfCAgICAgICB8fCAgICAgICB8fCB8IHwgICB8fCAgIHwgfCAgICAgIF98fCAgfCB8ICB8fCB8X19fX18gCnxfX19fXyAgfHxfICAgICBffHwgIF8gICAgfHwgfF98ICAgfHwgICB8IHwgICAgIHxfIHwgIHxffCAgfHxfX19fXyAgfAogX19fX198IHwgIHwgICB8ICB8IHwgfCAgIHx8ICAgICAgIHx8ICAgfCB8ICAgIF8gIHx8ICAgICAgIHwgX19fX198IHwKfF9fX19fX198ICB8X19ffCAgfF98ICB8X198fF9fX19fX3wgfF9fX3wgfF9fX3wgfF98fF9fX19fX198fF9fX19fX198Cg=="

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