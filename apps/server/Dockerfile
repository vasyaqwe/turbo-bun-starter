FROM oven/bun

WORKDIR /app

# Copy project
COPY . .

# To keep the image small ;)
RUN rm -rf /app/apps/mobile
RUN rm -rf /app/apps/web
RUN rm -rf /app/packages/ui

RUN rm -f bun.lockb && bun install --ignore-scripts

EXPOSE 3000

WORKDIR /app/apps/server

CMD ["bun", "start"]