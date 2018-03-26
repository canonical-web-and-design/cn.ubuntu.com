FROM ubuntu:xenial

# System dependencies
RUN apt-get update && apt-get install --yes python3-pip

# Python dependencies
ENV LANG C.UTF-8
RUN pip3 install --upgrade pip
RUN pip3 install gunicorn

# Set git commit ID
ARG COMMIT_ID
RUN test -n "${COMMIT_ID}"
RUN echo "${COMMIT_ID}" > version-info.txt

# Import code, install code dependencies
WORKDIR /srv
COPY . .
RUN pip3 install -r requirements.txt && rm requirements.txt

# Setup commands to run server
ENTRYPOINT ["gunicorn", "webapp.wsgi", "-b"]
CMD ["0.0.0.0:80"]

