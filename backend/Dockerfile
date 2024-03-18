
FROM python:3.10.8-slim-bullseye AS python_builder

# Set ENV variables that make Python more friendly to running inside a container.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# By default, pip caches copies of downloaded packages from PyPI. These are not useful within
# a Docker image, so disable this to reduce the size of images.
ENV PIP_NO_CACHE_DIR 1
ENV WORKDIR /src

WORKDIR ${WORKDIR}

# Install any system dependencies required to build wheels, such as C compilers or system packages
# For example:
RUN apt-get update && apt-get install

# Pre-download/compile wheel dependencies into a virtual environment.
# Doing this in a multi-stage build allows omitting compile dependencies from the final image.
# This must be the same path that is used in the final image as the virtual environment has
# absolute symlinks in it.
ENV VIRTUAL_ENV /opt/venv
RUN python -m venv ${VIRTUAL_ENV}
ENV PATH "${VIRTUAL_ENV}/bin:${PATH}"


RUN python -m pip install --upgrade pip
ADD requirements.txt .

# instala requirements
RUN pip install -r requirements.txt

COPY . .

## Final Image
# The image used in the final image MUST match exactly to the python_builder image.
FROM python:3.10.8-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
ENV PIP_NO_CACHE_DIR 1
ENV VIRTUAL_ENV /opt/venv

ENV HOME /home/user
ENV APP_HOME ${HOME}/app

RUN apt-get update && apt-get install -y gcc libssl-dev libcurl4-openssl-dev python3-dev && rm -rf /var/lib/apt/lists/*

# Create the home directory for the new user.
RUN mkdir -p ${HOME}

# Create the user so the program doesn't run as root. This increases security of the container.
RUN groupadd -r user && \
    useradd -r -g user -d ${HOME} -s /sbin/nologin -c "Docker image user" user

# Setup application install directory.
RUN mkdir ${APP_HOME}

# If you use Docker Compose volumes, you might need to create the directories in the image,
# otherwise when Docker Compose creates them they are owned by the root user and are inaccessible
# by the non-root user. See https://github.com/docker/compose/issues/3270

WORKDIR ${APP_HOME}

# Copy and activate pre-built virtual environment.
COPY --from=python_builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}
ENV PATH "${VIRTUAL_ENV}/bin:${PATH}"

# For Python applications that are not installable libraries, you may need to copy in source
# files here in the final image rather than in the python_builder image.
COPY . .
COPY ./static/ ./static/django/

# Give access to the entire home folder to the new user so that files and folders can be written
# there. Some packages such as matplotlib, want to write to the home folder.
RUN chown -R user:user ${HOME}

CMD [ "python", "manage.py", "runserver"]
