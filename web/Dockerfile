ARG JITSI_REPO=jitsi
FROM ${JITSI_REPO}/base

ADD https://dl.eff.org/certbot-auto /usr/local/bin/

COPY rootfs/ /
COPY jitsi-meet-web_1.0.1-1_all.deb /tmp/jitsi-meet-web.deb
COPY jitsi-meet-web-config_1.0.1-1_all.deb /tmp/jitsi-meet-web-config.deb

RUN \
	apt-dpkg-wrap apt-get update && \
	apt-dpkg-wrap apt-get install -y cron nginx-extras && \
	dpkg -i /tmp/jitsi-meet-web.deb && \
    dpkg -x /tmp/jitsi-meet-web-config.deb /tmp/pkg && \
    mv /tmp/pkg/usr/share/jitsi-meet-web-config/config.js /defaults && \
	mv /usr/share/jitsi-meet/interface_config.js /defaults && \
	apt-cleanup && \
	rm -f /etc/nginx/conf.d/default.conf && \
	rm -rf /tmp/pkg /var/cache/apt

RUN \
	chmod a+x /usr/local/bin/certbot-auto && \
	certbot-auto --noninteractive --install-only

EXPOSE 80 443

VOLUME ["/config", "/etc/letsencrypt", "/usr/share/jitsi-meet/transcripts"]
