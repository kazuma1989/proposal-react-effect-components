#!/bin/zsh

diff -ur examples/1-simple                    examples/2-subtree-rendering         > examples/2-subtree-rendering/1vs2.diff
diff -ur examples/2-subtree-rendering         examples/3-code-splitting            > examples/3-code-splitting/2vs3.diff
diff -ur examples/3-code-splitting            examples/4-code-splitting-refactored > examples/4-code-splitting-refactored/3vs4.diff
diff -ur examples/4-code-splitting-refactored examples/5-with-immer                > examples/5-with-immer/4vs5.diff
