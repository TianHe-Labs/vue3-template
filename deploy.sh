#!/usr/bin/env sh

# 停止脚本发生错误时
set -e

# 定义工作树目录
WORKTREE_DIR="build"

# 删除已存在的 build 目录以防止污染
rm -rf $WORKTREE_DIR

# 清理丢失或未使用的工作树
git worktree prune

# 如果 build 工作树已经存在于其他路径，先将其移除
if git worktree list | grep -q " $WORKTREE_DIR "; then
  echo "Removing existing worktree for build branch..."
  git worktree remove --force $WORKTREE_DIR
fi

# 检查 build 分支是否存在
if ! git show-ref --quiet refs/heads/build; then
  # 如果不存在，则创建 build 分支
  git checkout -b build
fi

# 创建或更新 build 分支的工作树
git worktree add -B build $WORKTREE_DIR

# 构建项目
pnpm run build

# 进入 build 工作树目录
cd $WORKTREE_DIR

# 清空 build 目录
git rm -rf .

# 从主项目的 dist 目录复制构建后的文件到 build 目录
cp -r ../dist/* .

# 如果需要，复制 package.json pnpm-lock.yaml
# cp ../package.json .
# cp ../pnpm-lock.yaml .

# 添加文件
git add .

# 提交更改
git commit -m "Deploying dist to build branch" --no-verify

# 强制推送到远程 build 分支
git push origin build --force

# 返回主项目目录
cd ..

# 清理工作树引用（如果目录存在）
git worktree remove --force $WORKTREE_DIR || true
