#!/bin/bash

# Add local user
# Either use the LOCAL_USER_ID if passed in at runtime or
# fallback

USER_ID=${LOCAL_USER_ID:-9001}
WORK_GROUP_ID=4343

echo "Starting with GID : $WORK_GROUP_ID"

if ! id -u thegame-docker > /dev/null 2>&1; then
	adduser -D -s /bin/bash thegame-docker
	addgroup -g $WORK_GROUP_ID thegame-workgroup
	addgroup sudo
	addgroup thegame-docker thegame-workgroup
	addgroup thegame-docker sudo
	echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
	echo "User created!"
fi


export HOME=/home/thegame-docker
cd $HOME/Workspace

echo 'eval "$(rbenv init -)"' >> ${HOME}/.bashrc
exec su -m thegame-docker -c "/bin/bash"
