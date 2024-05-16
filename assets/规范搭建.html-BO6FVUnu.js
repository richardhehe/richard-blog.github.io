import{_ as n,o as s,c as a,e as t}from"./app-e94K_zRz.js";const e={},i=t(`<h2 id="husky" tabindex="-1"><a class="header-anchor" href="#husky"><span>husky</span></a></h2><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h3><p><code>husky</code>是操作git hook的工具，通过配置一系列钩子，可以在git操作的不同阶段执行相应的命令。主要可以使用 eslint 配合 git hook， 在进行git commit 的时候验证eslint规范，如果 eslint 验证不通过，则不能提交。</p><h3 id="git-hook" tabindex="-1"><a class="header-anchor" href="#git-hook"><span>git hook</span></a></h3><p>git hook通常分为客户端钩子和服务端钩子，这里主要介绍客户端钩子。</p><ul><li><code>pre-commit</code>：该钩子在键入提交信息前运行。 它用于检查即将提交的快照。如果该钩子以非零值退出，Git 将放弃此次提交，你可以利用该钩子，在提交之前来检查代码风格是否一致。</li><li><code>prepare-commit-msg</code>：该钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。</li><li><code>commit-msg</code>：该钩子接收一个参数，此参数存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。</li><li><code>post-commit</code>：该钩子一般用于通知之类的事情。</li></ul><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h3><ul><li><ol><li>安装husky</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev husky
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><ol start="2"><li>向package.json的scripts中添加命令</li></ol></li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;prepare&quot;</span><span class="token operator">:</span> <span class="token string">&quot;husky install&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>prepare命令会在执行<code>npm install</code>（不带参数的情况下）之后自动执行。也就是说当我们执行<code>npm install</code>安装完项目依赖后会执行<code>husky install</code>命令，该命令会创建<code>.husky</code>并指定该目录为git hooks所在的目录。这里我们先手动执行一次<code>npm run prepare</code>。</p><ul><li><ol start="3"><li>配置husky</li></ol></li></ul><p>添加<code>pre-commit hooks</code>：<code>npx husky add .husky/pre-commit</code>  或 <code>npx husky set .husky/pre-commit</code></p><p>这将在<code>./husky/</code>目录下生成一个<code>pre-commit</code>脚本文件，在文件里添加<code>npm run lint</code>这个命令，添加完成后文件内容为：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token hashbang comment">#!/bin/sh</span>

<span class="token punctuation">.</span> <span class="token string">&quot;$(dirname &quot;</span>$0<span class="token string">&quot;)/husky.sh&quot;</span>

npm run lint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>npm run lint</code> 就是配置的<code>eslint</code></p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint .&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者也可以在package.json中配置</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint src&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token property">&quot;husky&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;hooks&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;pre-commit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npm run lint&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lint-staged" tabindex="-1"><a class="header-anchor" href="#lint-staged"><span>lint-staged</span></a></h2><h3 id="介绍-1" tabindex="-1"><a class="header-anchor" href="#介绍-1"><span>介绍</span></a></h3><p>完成husky配置之后，我们做到了通过每次 <code>git commit</code> 时都对项目做 <code>eslint</code> 检查，防止不符合规范的代码提交到仓库，但是这带来一个问题：每次提交都将对整个项目做 lint 检查，对于一个越来越大的项目来说，这无疑是一个很<code>耗时</code>的操作。除此之外，对于已经开发到中期的项目，项目中可能已经存在了大量不符合规范的代码，不能要求在提交时把所有历史遗留的问题修复之后才能提交。这个时候就需要用到lint-staged这个工具了。</p><h3 id="使用-1" tabindex="-1"><a class="header-anchor" href="#使用-1"><span>使用</span></a></h3><ul><li><ol><li>安装lint-staged</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev lint-staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><ol start="2"><li>在package.json中配置lint-staged</li></ol></li></ul><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint src&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prettier --write src&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lint-staged&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;src/**/*.{js,ts,vue}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;npm run lint&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;npm run format&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;git add&quot;</span>
  <span class="token punctuation">]</span>
  <span class="token comment">// 其他类型.....</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置的含义是：</p><ol><li>在提交之前，lint-staged 会自动运行 eslint 和 prettier，并且自动添加修复后的文件到暂存区。</li><li>Husky 会在 pre-commit 阶段运行 lint-staged。</li></ol><ul><li><ol start="3"><li>将.husky/pre-commit脚本的内容改为<code>npm run lint-staged</code></li></ol></li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token hashbang comment">#!/bin/sh</span>

<span class="token punctuation">.</span> <span class="token string">&quot;$(dirname &quot;</span>$0<span class="token string">&quot;)/husky.sh&quot;</span>

npm run lint<span class="token operator">-</span>staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的步骤，就完成了lint-staged的配置，这个时候再进行 git 提交时，将只检查暂存区（staged）的文件，不会检查项目所有文件，加快了每次提交 lint 检查的速度，同时也不会被历史遗留问题影响。</p><h2 id="commitlint" tabindex="-1"><a class="header-anchor" href="#commitlint"><span>commitlint</span></a></h2><h3 id="介绍-2" tabindex="-1"><a class="header-anchor" href="#介绍-2"><span>介绍</span></a></h3><p><code>Commitlint</code> 是一个用于规范 Git 提交信息格式的工具。它可以帮助团队确保提交信息的一致性和规范性，从而提高代码库的可维护性和可读性。</p><p>Commitlint 的工作原理是基于一套提交消息的规则（规范），这些规则通常包括了提交信息的结构、格式、内容等方面的要求。常见的规范是约定式提交规范（Conventional Commits Specification），它规定了提交信息的基本结构和类型，包括以下几个部分：</p><ul><li>类型（Type）：表示提交的类型，比如 feat（新功能）、fix（修复 bug）、docs（文档变更）、style（代码样式变更）等。</li><li>作用域（Scope）：表示提交影响的范围，比如文件名、模块名等。</li><li>主题（Subject）：简要描述本次提交的内容。</li><li>正文（Body）：可选项，用于详细描述本次提交的内容。</li><li>尾部（Footer）：可选项，用于添加一些额外的信息，比如引用的 issue 号、关联的 PR 等。</li></ul><p>Commitlint 可以通过配置文件或者命令行参数来指定所采用的规范，然后在提交代码时检查提交信息是否符合规范，如果不符合则会给出警告或者阻止提交。这样可以确保提交信息的一致性和清晰度，方便团队成员阅读和理解提交记录。</p><h3 id="使用-2" tabindex="-1"><a class="header-anchor" href="#使用-2"><span>使用</span></a></h3><ul><li><ol><li>安装</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># commitlint/config-conventional 是Angular 的提交规范</span>
<span class="token function">npm</span> <span class="token function">install</span> @commitlint/<span class="token punctuation">{</span>config-conventional,cli<span class="token punctuation">}</span> --save-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="2"><li>配置 commitlint</li></ol></li></ul><p>在项目的根目录下创建 commitlint.config.js 文件，并添加以下内容，rules可以不配置，默认</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@commitlint/config-conventional&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置是基于约定式提交规范的，默认使用了 @commitlint/config-conventional 插件。</p><ul><li><ol start="3"><li>.husky文件中添加commitlint钩子</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>npx husky <span class="token function">add</span> .husky/commit-msg <span class="token string">&quot;npm run commitlint&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><ol start="4"><li>package.json script中增加commitlint命令</li></ol></li></ul><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;commitlint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;commitlint --config commitlint.config.js -e -V&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按上面步骤修改完，我们在提交代码时候，如果随便写一个提交message将会报错</p><h2 id="commitizen" tabindex="-1"><a class="header-anchor" href="#commitizen"><span>commitizen</span></a></h2><p>基于 Node.js 的 git commit 命令行工具，生成标准化的 message</p><h2 id="cz-git" tabindex="-1"><a class="header-anchor" href="#cz-git"><span>cz-git</span></a></h2><p>cz-git 是 Commitizen 的一个适配器，它允许你使用 Commitizen 与 git 命令结合使用，从而创建符合约定式提交规范的提交消息。</p><h2 id="stylelint" tabindex="-1"><a class="header-anchor" href="#stylelint"><span>stylelint</span></a></h2><h3 id="介绍-3" tabindex="-1"><a class="header-anchor" href="#介绍-3"><span>介绍</span></a></h3><p><code>ESLint</code> 主要用于检查 <code>JavaScript</code> 代码，虽然它也能够处理一些与样式相关的问题，比如在 Vue 单文件组件中的 <code>&lt;style&gt;</code>部分的语法检查。但是，ESLint 并不是专门为样式文件设计的工具，它的主要重点还是在 JavaScript 代码的静态分析和规范检查上。</p><p>而 <code>Stylelint</code> 则是专门针对样式文件（如 <code>CSS、SCSS、LESS</code> 等）进行检查的工具，它提供了一套完整的规则集，用于检查样式文件中的语法错误、样式规范、命名约定等问题。</p><h3 id="使用-3" tabindex="-1"><a class="header-anchor" href="#使用-3"><span>使用</span></a></h3><ul><li><ol><li>安装stylelint</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>各个包的说明</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stylelint: css 样式 lint 工具, 用户检测样式文件(.css文件)
postcss: 转换 css 代码工具
postcss-scss: 识别 scss 语法的插件
postcss-html: 识别 html/vue 中的 &lt;style&gt;&lt;/style&gt; 标签中的样式
stylelint-config-standard: Stylelint的标准可共享配置规则，详细可查看官方文档
stylelint-config-prettier: 关闭所有不必要或可能与 Prettier 冲突的规则
stylelint-config-recommended-scss: scss的推荐可共享配置规则，详细可查看官方文档
stylelint-config-standard-vue: lint.vue文件的样式配置
stylelint-scss: stylelint-config-recommended-scss 的依赖，scss 的 stylelint 规则集合
stylelint-order: 指定样式书写的顺序，在 .stylelintrc.js 中 order/properties-order 指定顺序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="2"><li>在 package.json 文件中增加 scripts 命令</li></ol></li></ul><p>为了区分eslint和stylelint 这里将package.json中的 script修改为下面命令:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;eslint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint . --ext .js,.jsx,.ts,.tsx,.vue&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;eslint:fix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint . --fix --ext .js,.jsx,.ts,.tsx,.vue&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;stylelint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stylelint \\&quot;./**/*.{css,scss,sass,vue,html}\\&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;stylelint:fix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stylelint \\&quot;./**/*.{css,scss,sass,vue,html}\\&quot; --fix&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npm run eslint &amp; npm run stylelint&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lint:fix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npm run eslint:fix &amp; npm run stylelint:fix&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>eslint 使用 eslint 检测项目中的 vue、js、jsx、ts、tsx 代码。
eslint：fix 脚本代码格式化，一般搭配 eslint 命令使用。
stylelint 使用 stylelint 检测项目中的样式文件和其他样式规则的书写
stylelint：fix 样式代码格式化，一般搭配 stylelint 命令使用。
lint 同时检测样式代码和脚本代码(相当于同时执行了eslint和stylelint)。
lint：fix 代码格式化，一般搭配 lint 命令使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="3"><li>.stylelintrc.js 文件内容</li></ol></li></ul><p>在项目根目录下创建 .stylelintrc.js 文件，并配置 Stylelint，例如：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;stylelint-config-standard&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-config-recommended-scss&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-config-standard-vue&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-config-prettier&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;stylelint-order&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 不同格式的文件指定自定义语法</span>
  <span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.(scss|css|vue|html)&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">customSyntax</span><span class="token operator">:</span> <span class="token string">&#39;postcss-scss&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.(html|vue)&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">customSyntax</span><span class="token operator">:</span> <span class="token string">&#39;postcss-html&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">ignoreFiles</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.jsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.tsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.ts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.yaml&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;string-quotes&#39;</span><span class="token operator">:</span> <span class="token string">&#39;single&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器</span>
    <span class="token string-property property">&#39;no-descending-specificity&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;selector-pseudo-element-no-unknown&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">ignorePseudoElements</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;v-deep&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;selector-pseudo-class-no-unknown&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">ignorePseudoClasses</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;deep&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用每个选择器之前插入空行</span>
    <span class="token string-property property">&#39;rule-empty-line-before&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止小于 1 的小数有一个前导零</span>
    <span class="token comment">// &#39;number-leading-zero&#39;: &#39;never&#39;,</span>
    <span class="token comment">// 一些特殊的scss指令</span>
    <span class="token string-property property">&#39;at-rule-no-unknown&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">ignoreAtRules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;function&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;if&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;else&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;else-if&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;each&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;mixin&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;at-rule-empty-line-before&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">except</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;blockless-after-same-name-blockless&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first-nested&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">ignore</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;after-comment&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">ignoreAtRules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;else&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;else-if&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 指定样式的排序</span>
    <span class="token string-property property">&#39;order/properties-order&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;position&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;top&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;right&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;bottom&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;left&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;z-index&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;display&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;justify-content&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;align-items&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;flex-shrink&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;float&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;clear&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;overflow&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;overflow-x&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;overflow-y&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;min-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;max-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;height&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;min-height&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;max-height&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;padding&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;padding-top&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;padding-right&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;padding-bottom&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;padding-left&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;margin&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;margin-top&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;margin-right&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;margin-bottom&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;margin-left&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;font-size&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;font-family&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;text-align&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;text-justify&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;text-indent&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;text-overflow&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;text-decoration&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;white-space&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;background&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;background-position&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;background-repeat&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;background-size&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;background-color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;background-clip&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-style&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-top-style&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-top-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-top-color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-right-style&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-right-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-right-color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-bottom-style&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-bottom-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-bottom-color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-left-style&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-left-width&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-left-color&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;border-radius&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;opacity&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;filter&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;list-style&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;outline&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;visibility&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;box-shadow&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;text-shadow&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;resize&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;transition&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;content&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="4"><li>安装vscode的Stylelint插件</li></ol></li></ul><p>安装该插件可在我们保存代码时自动执行stylelint</p><p>在.vscode/settings.json中添加一下规则</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 开启自动修复</span>
  <span class="token property">&quot;editor.codeActionsOnSave&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;source.fixAll&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;source.fixAll.eslint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
+   <span class="token property">&quot;source.fixAll.stylelint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 保存的时候自动格式化</span>
  <span class="token property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 默认格式化工具选择prettier</span>
  <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 配置该项，新建文件时默认就是space：2</span>
  <span class="token property">&quot;editor.tabSize&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token comment">// stylelint校验的文件格式</span>
+ <span class="token property">&quot;stylelint.validate&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;css&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;less&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;html&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单规范" tabindex="-1"><a class="header-anchor" href="#简单规范"><span>简单规范</span></a></h2><p><strong>提交类型</strong></p><ol><li>&lt;新增&gt;</li><li>&lt;修复&gt;</li><li>&lt;优化&gt;</li><li>&lt;删除&gt;</li><li>&lt;**&gt; 比如: &lt;项目初始化&gt; <code>&lt;init&gt;</code>之类</li></ol><p>说明</p><p>提交描述要精确到模块, 具体位置通过【】(中括号)标注，部分模块共同bug可列出相关模块并简单描述。</p><p>例子:</p><p>&lt;新增&gt;</p><ol><li>在【库存管理】里新增了【库存订单】模块</li><li>新增了【订单管理】模块</li><li>新增了【员工管理】模块</li></ol><p>&lt;修复&gt;</p><ol><li>修复了【会员管理】弹出层显示异常的问题</li><li>修复了【会员管理】的【列表筛选】输入框未限制长度的问题</li><li>修复了【订单管理】计算总价错误的逻辑问题</li></ol><p>&lt;优化&gt;</p><ol><li>优化了【会员管理】的弹窗操作，现在打开弹窗，第一个输入框可自动获取焦点</li><li>优化了【会员管理】【订单管理】【商品管理】的【列表筛选】输入框操作, 现在可以一键清除内容。</li><li>优化了【订单管理】的【新增/编辑】框内日期的操作，添加了快捷设置日期的选项</li></ol><p>&lt;删除&gt;</p><ol><li>移除了【排菜管理】板块</li><li>移除了【会员管理】列表的【批量删除】功能</li></ol>`,90),l=[i];function p(o,c){return s(),a("div",null,l)}const u=n(e,[["render",p],["__file","规范搭建.html.vue"]]),d=JSON.parse('{"path":"/engineering/standard/%E8%A7%84%E8%8C%83%E6%90%AD%E5%BB%BA.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"husky","slug":"husky","link":"#husky","children":[{"level":3,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":3,"title":"git hook","slug":"git-hook","link":"#git-hook","children":[]},{"level":3,"title":"使用","slug":"使用","link":"#使用","children":[]}]},{"level":2,"title":"lint-staged","slug":"lint-staged","link":"#lint-staged","children":[{"level":3,"title":"介绍","slug":"介绍-1","link":"#介绍-1","children":[]},{"level":3,"title":"使用","slug":"使用-1","link":"#使用-1","children":[]}]},{"level":2,"title":"commitlint","slug":"commitlint","link":"#commitlint","children":[{"level":3,"title":"介绍","slug":"介绍-2","link":"#介绍-2","children":[]},{"level":3,"title":"使用","slug":"使用-2","link":"#使用-2","children":[]}]},{"level":2,"title":"commitizen","slug":"commitizen","link":"#commitizen","children":[]},{"level":2,"title":"cz-git","slug":"cz-git","link":"#cz-git","children":[]},{"level":2,"title":"stylelint","slug":"stylelint","link":"#stylelint","children":[{"level":3,"title":"介绍","slug":"介绍-3","link":"#介绍-3","children":[]},{"level":3,"title":"使用","slug":"使用-3","link":"#使用-3","children":[]}]},{"level":2,"title":"简单规范","slug":"简单规范","link":"#简单规范","children":[]}],"git":{"updatedTime":1712455531000,"contributors":[{"name":"zqy","email":"1324980809@qq.com","commits":1}]},"filePathRelative":"engineering/standard/规范搭建.md"}');export{u as comp,d as data};
