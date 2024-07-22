@echo off
cd %~dp0
if exist tmp (
	rmdir /s /q tmp
)
git clone https://github.com/RBBNet/participantes tmp
cp tmp\lab\nodes.json .
rmdir /s /q tmp
