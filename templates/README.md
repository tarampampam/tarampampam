<p align="center">
  <img src="https://hsto.org/webt/e2/0q/nf/e20qnfbscs_ygi5qd9zljiqeupq.gif" alt="follow the white rabbit" width="100%" />
</p>

#### 👷 Check out what I'm currently working on

{{range recentContributions 6}}
- [{{.Repo.Name}}]({{.Repo.URL}}) - {{.Repo.Description}} ({{humanize .OccurredAt}})
{{- end}}

#### 👨‍💻 Repositories I created recently

{{range recentRepos 4}}
- [{{.Name}}]({{.URL}}){{ with .Description }} - {{.}}{{ end }}
{{- end}}

#### 🚀 Latest releases I've contributed to

{{range recentReleases 6}}
- [{{.Name}}]({{.URL}}) ([{{.LastRelease.TagName}}]({{.LastRelease.URL}}), {{humanize .LastRelease.PublishedAt}}){{ with .Description }} - {{.}}{{ end }}
{{- end}}

<p align="center">&nbsp;</p>

<img align="left" src="https://github-readme-stats.vercel.app/api/top-langs/?username=tarampampam&layout=compact&hide_border=true&langs_count=8&card_width=265&theme=chartreuse-dark" />
<img align="right" src="https://github-readme-stats.vercel.app/api?username=tarampampam&show_icons=true&hide_border=true&layout=compact&theme=chartreuse-dark" />
