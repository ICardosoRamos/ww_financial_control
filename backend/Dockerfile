FROM python:3.10


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
ENV PIP_NO_CACHE_DIR 1

ENV VIRTUAL_ENV /venv

ENV HOME /home/user
ENV BACKEND_HOME ${HOME}/backend


RUN apt-get update && apt-get install -y poppler-utils curl && rm -rf /var/lib/apt/lists/*
RUN mkdir -p ${HOME}
RUN groupadd -r user && \
    useradd -r -g user -d ${HOME} -s /sbin/nologin -c "Docker image user" user

RUN mkdir ${BACKEND_HOME}

WORKDIR ${BACKEND_HOME}


RUN python -m venv "${VIRTUAL_ENV}"
RUN bash -c "source ${VIRTUAL_ENV}/bin/activate"

COPY requirements.txt ./

RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt

COPY . .

RUN chown -R user:user ${HOME}

RUN chmod +x /home/user/backend/entrypoint.sh


CMD [ "python3", "manage.py", "runserver", "0:0:0:0:8000" ]