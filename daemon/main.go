package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func main() {
	fmt.Println("demoxhexadctyl daemon by death legion team starting...")

	// Force a newer API version if the environment negotiation is failing
	apiVersion := os.Getenv("DOCKER_API_VERSION")
	if apiVersion == "" {
		apiVersion = "1.44"
	}

	cli, err := client.NewClientWithOpts(
		client.FromEnv,
		client.WithVersion(apiVersion),
	)
	if err != nil {
		log.Fatalf("Error creating Docker client: %v", err)
	}
	defer cli.Close()

	// Basic Ping
	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "success",
			"message": "demoxhexadctyl daemon is active",
			"version": "1.0.0",
		})
	})

	// List Containers
	http.HandleFunc("/containers", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{All: true})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(containers)
	})

	// Container Actions (Start/Stop/Restart/Stats)
	http.HandleFunc("/containers/", func(w http.ResponseWriter, r *http.Request) {
		parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/containers/"), "/")
		if len(parts) < 2 {
			http.Error(w, "Invalid URL", http.StatusBadRequest)
			return
		}

		containerID := parts[0]
		action := parts[1]
		ctx := context.Background()

		var err error
		switch action {
		case "start":
			err = cli.ContainerStart(ctx, containerID, types.ContainerStartOptions{})
		case "stop":
			duration := 10 * time.Second
			err = cli.ContainerStop(ctx, containerID, &duration)
		case "restart":
			duration := 10 * time.Second
			err = cli.ContainerRestart(ctx, containerID, &duration)
		case "stats":
			stats, err := cli.ContainerStats(ctx, containerID, false)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			defer stats.Body.Close()
			w.Header().Set("Content-Type", "application/json")
			var statsJSON interface{}
			json.NewDecoder(stats.Body).Decode(&statsJSON)
			json.NewEncoder(w).Encode(statsJSON)
			return
		default:
			http.Error(w, "Unknown action", http.StatusNotFound)
			return
		}

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "success",
			"message": fmt.Sprintf("Action %s executed on %s", action, containerID),
		})
	})

	log.Println("Listening on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
