FROM rethinkdb:latest

USER rethinkdb

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8080

EXPOSE ${PORT}
CMD [ "service", "rethinkdb" , "start" ]
