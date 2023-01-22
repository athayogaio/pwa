import logging
from time import sleep
from typing import Any

from django.core.management import BaseCommand
from elasticsearch.exceptions import ConnectionError as ConnErr
from elasticsearch_dsl.connections import connections

logger = logging.getLogger("default_log")


class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> None:
        for i in range(10):
            logger.info(f"Wait for Elasticsearch connection {i}")
            try:
                connections.get_connection().cluster.health()
            except ConnErr:
                sleep(5 * i)
            else:
                logger.info("Elasticsearch success connection")
                return
        raise ConnectionError("Fail connection to Elasticsearch")
