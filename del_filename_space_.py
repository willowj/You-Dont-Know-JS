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


def safe_name(path=None):
    path = path or os.curdir

    for i,z in enumerate(os.listdir(path)):
        if os.path.isdir(z) and not z.startswith('.'):
            os.rename(z, re.sub('\W', '_',z))
            safe_name(path=os.listdir(path)[i])

def change_readme(path=None):
    path = path or os.curdir
    for z in os.listdir(os.curdir):
        if not os.path.isdir(z):
            continue
        for y in os.listdir(z):
            if y.lower() == 'readme.md':
                print z
                print replace_text(z + '/' + y,
                                   '\]\((\w+)\.md\)',
                                   r'](/' + z + r'/\1.md)',
                                   re_sub=True
                                   )

        # if z.lower() == 'readme.md':
        #     replace_text(z, '\%20&\%20', '_vs_')
if __name__ == '__main__':
     safe_name()
     change_readme()