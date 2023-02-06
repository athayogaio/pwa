from collections import OrderedDict
from urllib import parse


def encode_dict_to_query_params(d: OrderedDict) -> str:
    s = ""
    for key, value in d.items():
        if isinstance(value, (tuple, list, set)):
            for v in set(value):
                s += f"{key}={parse.quote(v)}&"
        elif value:
            s += f"{key}={parse.quote(value)}&"
    return s
