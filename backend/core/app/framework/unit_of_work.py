from functools import wraps
from typing import Callable, Optional, Any

from django.db import transaction


class UnitOfWork:
    def __enter__(self) -> "UnitOfWork":
        self.transaction = transaction.atomic()
        self.transaction.__enter__()
        return self

    def __exit__(
        self, exc_type: Optional[Exception], exc_value: Any, traceback: Any
    ) -> bool:
        if exc_type is None:
            self.transaction.__exit__(exc_type, exc_value, traceback)
        else:
            transaction.set_rollback(True)
        return exc_type is None


def transaction_method(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        with UnitOfWork():
            result = func(*args, **kwargs)
        return result

    return wrapper
