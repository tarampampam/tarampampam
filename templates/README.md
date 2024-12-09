> [!NOTE]
> Hello there! I'm available for hire. Whether you're looking for someone for an existing project or building a team for a startup,
> feel free to email me at [`github@tarampamp.am`](mailto:github@tarampamp.am). I'll be happy to send you my CV 🤝

<p align="center">
  <img src="https://user-images.githubusercontent.com/7326800/169659102-a2a08918-f296-4c9e-8182-625598c9ea35.png" alt="coding" width="100%" />
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=tarampampam&show_icons=true&hide_border=true&layout=compactdark&hide_rank=true&include_all_commits=true&theme=chartreuse-dark&bg_color=00000000">
  <img align="left" src="https://github-readme-stats.vercel.app/api?username=tarampampam&show_icons=true&hide_border=true&layout=compact&hide_rank=true&include_all_commits=true&theme=default&bg_color=00000000">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=tarampampam&exclude_repo=laravel-roadrunner-in-docker&layout=compact&hide_border=true&langs_count=8&theme=chartreuse-dark&bg_color=00000000">
  <img align="right" src="https://github-readme-stats.vercel.app/api/top-langs/?username=tarampampam&exclude_repo=laravel-roadrunner-in-docker&layout=compact&hide_border=true&langs_count=8&theme=default&bg_color=00000000">
</picture>

<br clear="both"/>

#### 👷 Check out what I'm currently working on

{{ range recentContributions 7 }}{{ if ne .Repo.Name "iddqd-uk/blog" }}{{ if ne .Repo.Name "Annsh21/portfolio" }}{{ if ne .Repo.Name "klassuk/klassuk" }}{{ if ne .Repo.Name "klassuk/klassuk.github.io" }}
- [{{ .Repo.Name }}]({{ .Repo.URL }}) - {{ .Repo.Description }} ({{ humanize .OccurredAt }})
{{- end }}{{- end }}{{- end }}{{- end }}{{- end }}

#### 🌱 My latest projects

{{ range recentRepos 3 }}
- [{{ .Name }}]({{ .URL }}){{ with .Description }} - {{ . }}{{ end }}
{{- end }}

#### 🚀 Latest releases I've contributed to

{{ range recentReleases 4 }}
- [{{ .Name }}]({{ .URL }}) ([{{ .LastRelease.TagName }}]({{ .LastRelease.URL }}), {{ humanize .LastRelease.PublishedAt }}){{ with .Description }} - {{ . }}{{ end }}
{{- end }}

#### 🔨 Latest Pull Requests I published

{{ range recentPullRequests 4 }}
- [{{ .Title }}]({{ .URL }}) on [{{ .Repo.Name }}]({{ .Repo.URL }}) ({{ humanize .CreatedAt }})
{{- end }}

#### ⭐ Recent stars

{{ range recentStars 4 }}
- [{{ .Repo.Name }}]({{ .Repo.URL }}){{ with .Repo.Description }} - {{ . }}{{ end }} ({{ humanize .StarredAt }})
{{- end }}

#### 💬 Feedback

If you use one of my projects, I'd love to hear from you! Please don't hesitate to share what you liked and what could be improved. Have an issue? Open a ticket—I don't bite and will do my best to help!
