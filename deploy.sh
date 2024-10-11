#!/usr/bin/env sh

# 利用 git worktree 将构建后的 dist 目录推送到 build 分支

# 停止脚本发生错误时
set -e

# 定义工作树目录
WORKTREE_DIR="build"

# 清理丢失或未使用的工作树
git worktree prune

# 构建项目
pnpm run build

# 如果已经存在工作树，则删除它
if [ -d "$WORKTREE_DIR" ]; then
  echo "Removing existing worktree directory..."
  git worktree remove $WORKTREE_DIR || rm -rf $WORKTREE_DIR
fi

# 创建 build 分支的工作树，如果 build 分支不存在，则创建它
git worktree add $WORKTREE_DIR build || git worktree add -B build $WORKTREE_DIR

# 进入 build 工作树目录
cd $WORKTREE_DIR

# 从主项目的 dist 目录复制构建后的文件到 build 目录
cp -r ../dist/* .

# 如果需要，复制 package.json pnpm-lock.yaml .gitignore
# cp ../package.json .
# cp ../pnpm-lock.yaml .
cp ../.gitignore .

# 添加文件
git add .

# 提交更改
git commit -m "Deploying dist to build branch"

# 强制推送到远程 build 分支
git push origin build --force

# 返回主项目目录
cd ..

# 清理工作树
git worktree remove $WORKTREE_DIR
