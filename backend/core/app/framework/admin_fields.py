import json
from dataclasses import is_dataclass, asdict
from typing import Any, Optional

from django.forms import JSONField


class CustomJSONField(JSONField):
    def prepare_value(self, value: Any) -> Optional[str]:
        if value is None:
            return value
        if isinstance(value, list):
            value = [asdict(i) if is_dataclass(i) else i for i in value]
        elif not isinstance(value, dict) and is_dataclass(value):
            value = asdict(value)
        return json.dumps(value, ensure_ascii=False, default=str)
