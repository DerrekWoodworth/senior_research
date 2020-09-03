FROM clojure:lein
RUN apt update
RUN apt install -y build-essential 
RUN git clone https://github.com/protojure/protoc-plugin.git
WORKDIR protoc-plugin
RUN make
