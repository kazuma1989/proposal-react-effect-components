#!/bin/zsh

diff -ur examples/1-simple                    examples/2-subtree-rendering         > examples/2-subtree-rendering/1vs2.diff
diff -ur examples/2-subtree-rendering         examples/3-code-splitting            > examples/3-code-splitting/2vs3.diff
diff -ur examples/3-code-splitting            examples/4-code-splitting-refactored > examples/4-code-splitting-refactored/3vs4.diff
diff -ur examples/4-code-splitting-refactored examples/9-with-comments             > examples/9-with-comments/4vs9.diff
