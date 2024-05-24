FROM python:3.10.8-slim-bullseye AS python_builder



ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1


ENV PIP_NO_CACHE_DIR 1
ENV WORKDIR /src

WORKDIR ${WORKDIR}


RUN apt-get update && apt-get install -y figlet lolcat gcc libssl-dev libcurl4-openssl-dev python3-dev && rm -rf /var/lib/apt/lists/*
RUN python3 -m pip install --upgrade pip


ENV VIRTUAL_ENV /opt/venv
RUN python -m venv ${VIRTUAL_ENV}
ENV PATH "${VIRTUAL_ENV}/bin:${PATH}"


COPY requirements.txt ./

RUN python3 -m pip install -r requirements.txt

# Copy in source files.
COPY . .







FROM python:3.10


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
ENV PIP_NO_CACHE_DIR 1
ENV VIRTUAL_ENV /opt/venv
ENV HOME /home/user
ENV BACKEND_HOME ${HOME}/backend


RUN apt-get update && apt-get install -y figlet lolcat poppler-utils curl && rm -rf /var/lib/apt/lists/*
RUN mkdir -p ${HOME}
RUN groupadd -r user && \
    useradd -r -g user -d ${HOME} -s /sbin/nologin -c "Docker image user" user

RUN mkdir ${BACKEND_HOME}

WORKDIR ${BACKEND_HOME}


COPY --from=python_builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}
ENV PATH "${VIRTUAL_ENV}/bin:${PATH}"

COPY . .
# COPY ./static/ ./static/django/

RUN chown -R user:user ${HOME}

RUN chmod +x /home/user/backend/entrypoint.sh


CMD [ "python3", "manage.py", "runserver", "0:0:0:0:8000" ]