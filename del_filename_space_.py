#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# author: willowj
# date: 2018-05-23 22:40:14
#

import os
import re


def replace_text(file_path, parttern, new, re_sub=False):
    with open(file_path, 'r') as f:
        art = f.read()
        if re_sub:
            art = re.sub(parttern, new, art)
        else:
            art = art.replace(parttern, new)

    with open(file_path, 'w') as f:
        f.write(art)

    return re_sub and art


for z in os.listdir(os.curdir):
    if os.path.isdir(z) and not z.startswith('.'):
        if ' & ' in z:
            os.rename(z, z.replace(' & ', '_vs_'))
        for y in os.listdir(z):
            if y.lower() == 'readme.md':
                print z
                print replace_text(z + '/' + y,
                                   '\]\((\w+)\.md\)',
                                   r'](/' + z + r'/\1.md)',
                                   re_sub=True
                                   )

    if z.lower() == 'readme.md':
        replace_text(z, '\%20&\%20', '_vs_')
