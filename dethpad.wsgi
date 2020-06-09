#!/usr/bin/python3
import sys
sys.path.insert(0,"/var/www/dethpad/")
sys.path.insert(0,"/var/www/dethpad/dethpad/")

import logging
logging.basicConfig(stream=sys.stderr)

from dethpad import app as application
