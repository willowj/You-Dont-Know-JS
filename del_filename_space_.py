#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# author: willowj
# date: 2018-05-23 22:40:14
#

import os
for z in os.listdir(os.curdir):
    if os.path.isdir(z) and not z.startswith('.'):
        os.rename(z,z.replace(' & ','_vs_'))

