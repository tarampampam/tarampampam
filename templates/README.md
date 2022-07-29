<p align="center">
  <img src="https://user-images.githubusercontent.com/7326800/169659102-a2a08918-f296-4c9e-8182-625598c9ea35.png" alt="coding" width="100%" />
</p>

<p align="center">
  🇺🇦 Слава Україні! &nbsp; <img src="https://hsto.org/webt/tb/uu/ou/tbuuougi5fsyvtgkztz38luf3sw.png" width="14" alt="bel" /> Жыве Беларусь! &nbsp; <img src="data:image/webp;base64,UklGRiIBAABXRUJQVlA4TBYBAAAv/IrUAQ9wwv/9//X//McDzLRtUyblj3IUdtUR/Z+A8D//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8/8mf99d/uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//uM//huNwv/8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z/+bPA==" alt="ru" width="18"> Привет Хабаровск!<br />
  Freedom for political prisoners!
</p>

#### 👷 Check out what I'm currently working on

{{ range recentContributions 7 }}{{ if ne .Repo.Name "hook-sh/blog" }}
- [{{ .Repo.Name }}]({{ .Repo.URL }}) - {{ .Repo.Description }} ({{ humanize .OccurredAt }})
{{- end }}{{- end }}

#### 🌱 My latest projects

{{ range recentRepos 4 }}
- [{{ .Name }}]({{ .URL }}){{ with .Description }} - {{ . }}{{ end }}
{{- end }}

#### 🚀 Latest releases I've contributed to

{{ range recentReleases 6 }}
- [{{ .Name }}]({{ .URL }}) ([{{ .LastRelease.TagName }}]({{ .LastRelease.URL }}), {{ humanize .LastRelease.PublishedAt }}){{ with .Description }} - {{ . }}{{ end }}
{{- end }}

#### 🔨 Latest Pull Requests I published

{{ range recentPullRequests 4 }}
- [{{ .Title }}]({{ .URL }}) on [{{ .Repo.Name }}]({{ .Repo.URL }}) ({{ humanize .CreatedAt }})
{{- end }}

#### ⭐ Recent stars

{{ range recentStars 3 }}
- [{{ .Repo.Name }}]({{ .Repo.URL }}){{ with .Repo.Description }} - {{ . }}{{ end }} ({{ humanize .StarredAt }})
{{- end }}

#### 💬 Feedback

If you use one of my projects, I'd love to hear from you! Don't be shy and let me know what you liked and what needs being improved. Got an issue? Open a ticket, I don't bite and will try my best to help!

<img align="left" src="https://github-readme-stats.vercel.app/api/top-langs/?username=tarampampam&exclude_repo=laravel-roadrunner-in-docker&layout=compact&hide_border=true&langs_count=8&theme=chartreuse-dark&bg_color=0d1117" />
<img align="right" src="https://github-readme-stats.vercel.app/api?username=tarampampam&show_icons=true&hide_border=true&layout=compact&theme=chartreuse-dark&hide_rank=true&include_all_commits=true&bg_color=0d1117" />
