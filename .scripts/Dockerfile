FROM cpclermont/lighthouse-ci-action:1.0.0
RUN gem uninstall shopify-cli
RUN gem install shopify-cli -N -n /usr/local/bin
COPY ./.scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]